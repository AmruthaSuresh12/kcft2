// Vercel Serverless Function: GET /api/gallery-media?category=Shloka Class
// Uses Cloudinary Search API to fetch images by both asset_folder and public_id prefix
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const category = req.query?.category;
  if (!category) {
    return res.status(400).json({ success: false, message: 'Missing ?category= parameter' });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ success: false, message: 'Cloudinary credentials not configured' });
  }

  const folder = `kcft/${category}`;
  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  try {
    // Query Cloudinary Search API (matches both asset_folder and public_id prefix)
    const searchBody = JSON.stringify({
      expression: `asset_folder:"${folder}" OR public_id:"${folder}/*"`,
      max_results: 50,
      sort_by: [{ created_at: 'desc' }]
    });

    const searchRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`
        },
        body: searchBody
      }
    );

    if (!searchRes.ok) {
      // Fallback to legacy prefix search if search API is unavailable
      const legacyRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?prefix=${encodeURIComponent(folder)}&max_results=50&type=upload`,
        { headers: { Authorization: `Basic ${credentials}` } }
      );
      const legacyData = await legacyRes.json();
      const media = (legacyData.resources || []).map(r => ({
        url: r.secure_url,
        type: r.resource_type === 'video' ? 'video' : 'image',
        publicId: r.public_id
      }));
      res.setHeader('Cache-Control', 'public, max-age=10');
      return res.status(200).json({ success: true, media, count: media.length });
    }

    const searchData = await searchRes.json();
    const media = (searchData.resources || []).map(r => ({
      url: r.secure_url,
      type: r.resource_type === 'video' ? 'video' : 'image',
      publicId: r.public_id
    }));

    res.setHeader('Cache-Control', 'public, max-age=10');
    return res.status(200).json({ success: true, media, count: media.length });
  } catch (error) {
    console.error('Cloudinary gallery fetch error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
