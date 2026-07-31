// Netlify Function: GET /api/gallery-media?category=dance
// Fetches media (images + videos) from Cloudinary for a given category folder.
// Credentials stay server-side — never exposed to the browser.

exports.handler = async function (event) {
  // Only allow GET
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ success: false, message: 'Method Not Allowed' }) };
  }

  const category = event.queryStringParameters?.category;
  if (!category) {
    return { statusCode: 400, body: JSON.stringify({ success: false, message: 'Missing ?category= parameter' }) };
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return { statusCode: 500, body: JSON.stringify({ success: false, message: 'Cloudinary credentials not configured' }) };
  }

  // Cloudinary Admin API — list resources in folder kcft/<category>
  const folder = `kcft/${category}`;
  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  try {
    // Fetch images
    const imgRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?prefix=${encodeURIComponent(folder)}&max_results=50&type=upload`,
      { headers: { Authorization: `Basic ${credentials}` } }
    );
    // Fetch videos
    const vidRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/video?prefix=${encodeURIComponent(folder)}&max_results=50&type=upload`,
      { headers: { Authorization: `Basic ${credentials}` } }
    );

    if (!imgRes.ok || !vidRes.ok) {
      throw new Error('Cloudinary API error');
    }

    const imgData = await imgRes.json();
    const vidData = await vidRes.json();

    // Map to simple { url, type } objects, sorted newest first
    const images = (imgData.resources || [])
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map(r => ({ url: r.secure_url, type: 'image', publicId: r.public_id }));

    const videos = (vidData.resources || [])
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map(r => ({ url: r.secure_url, type: 'video', publicId: r.public_id }));

    const media = [...images, ...videos];

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
      body: JSON.stringify({ success: true, media, count: media.length })
    };
  } catch (error) {
    console.error('Cloudinary fetch error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};
