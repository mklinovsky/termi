export async function readFromStream(stream = Deno.stdin.readable) {
  let data = '';

  for await (const chunk of stream) {
    data += chunk;
  }

  return data;
}
