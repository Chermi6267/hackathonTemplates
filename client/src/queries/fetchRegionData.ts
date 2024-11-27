import api from "@/http/api";
import { IAdminCenter } from "@/interfaces/landmark";

export const fetchRegionData = async (regionId: string, cats: string) => {
  const result = await api.get(`/landmark/center/${regionId}`);

  return { adminCenter: result.data as IAdminCenter };
};
