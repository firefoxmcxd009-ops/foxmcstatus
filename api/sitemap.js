export default function handler(req, res) {
const baseUrl = "https://foxmcstatus.vercel.app";

const pages = [
"/",
"/Tools/Status",
"/Tools/Skins",
"/Tools/Bot"
];

let urls = "";

pages.forEach((page) => {
urls += "<url> <loc>${baseUrl}${page}</loc> <lastmod>${new Date().toISOString()}</lastmod> <changefreq>daily</changefreq> <priority>${page === "/" ? "1.0" : "0.8"}</priority> </url>";
});

const sitemap = "<?xml version="1.0" encoding="UTF-8"?> <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> ${urls} </urlset>";

res.setHeader("Content-Type", "text/xml");
res.status(200).send(sitemap);
}
