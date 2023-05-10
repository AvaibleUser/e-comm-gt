import axios from "axios";

const baseUrl = "/api/reports";

export async function getReport(
  reportUri: string,
  start?: Date | string,
  end?: Date | string
): Promise<object[]> {
  const { data } = await axios.get(`${baseUrl}/${reportUri}`, {
    params: { start, end },
  });

  return data;
}
