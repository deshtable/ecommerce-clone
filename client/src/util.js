export async function postJSON(url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (e) {
    console.log(e);
    return {};
  }
}
