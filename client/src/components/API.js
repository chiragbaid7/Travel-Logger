const API_URL = "http://localhost:8080/api/logs";
export async function listLogs() {
  const response = await fetch(API_URL,{credentials:"include"});
  return await response.json();
}
