import axios from "axios";

export async function GET(req: Request) {
  const url = new URL(req.url);
  // search for params that editorjs provide for us
  const href = url.searchParams.get("url");

  if (!href) {
    return new Response("Invalid href", { status: 400 });
  }

  // get href and making request to it
  const res = await axios.get(href);

  // i dunno wth is this, but i just follow what editorjs says to me
  const titleMatch = res.data.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : "";
  console.log(`title: ${title}`);

  const descriptionMatch = res.data.match(
    /<meta name="description" content="(.*?)"/
  );
  const description = descriptionMatch ? descriptionMatch[1] : "";
  console.log(`description: ${description}`);

  const imgMatch = res.data.match(/<meta property="og:image" content="(.*?)"/);
  const imgUrl = imgMatch ? imgMatch[1] : "";
  console.log(`imgUrl: ${imgUrl}`);

  // return format from editorjs
  return new Response(
    JSON.stringify({
      success: 1,
      meta: {
        title,
        description,
        image: {
          url: imgUrl,
        },
      },
    })
  );
}
