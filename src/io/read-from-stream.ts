export async function readFromStream(stream = process.stdin) {
  let data = '';

  for await (const chunk of stream) {
    data += chunk;
  }

  return data;
}
