export default function handler(req, res) {
  res.json({ NEXT_PUBLIC_BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API || null });
}
