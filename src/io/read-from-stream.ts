export async function readFromStream(stream = Deno.stdin.readable) {
  const decoder = new TextDecoder("utf-8");
  let data = "";

  for await (const chunk of stream) {
    data += decoder.decode(chunk);
  }

  return data;
}
