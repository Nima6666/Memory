export default async function apiCaller() {
  let data;
  try {
    data = await fetch(
      "https://api.giphy.com/v2/emoji?api_key=a6PHLdlvRoPZRfTRcR0D9UB3iDA5GEIE&limit=15&offset=0",
      { mode: "cors" }
    );
  } catch (err) {
    console.log(err);
  }

  const readableData = await data.json();
  return readableData;
}
