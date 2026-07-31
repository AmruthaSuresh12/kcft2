// Vercel Serverless Function: GET /api/gallery-media?category=Dance
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
    const imgRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?prefix=${encodeURIComponent(folder)}&max_results=50&type=upload`,
      { headers: { Authorization: `Basic ${credentials}` } }
    );
    const vidRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/video?prefix=${encodeURIComponent(folder)}&max_results=50&type=upload`,
      { headers: { Authorization: `Basic ${credentials}` } }
    );

    if (!imgRes.ok || !vidRes.ok) {
      throw new Error('Cloudinary API error');
    }

    const imgData = await imgRes.json();
    const vidData = await vidRes.json();

    const images = (imgData.resources || [])
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map(r => ({ url: r.secure_url, type: 'image', publicId: r.public_id }));

    const videos = (vidData.resources || [])
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map(r => ({ url: r.secure_url, type: 'video', publicId: r.public_id }));

    const media = [...images, ...videos];

    res.setHeader('Cache-Control', 'public, max-age=60');
    return res.status(200).json({ success: true, media, count: media.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
