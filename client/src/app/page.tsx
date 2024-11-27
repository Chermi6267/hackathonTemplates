import Home from "./home";

export default async function Page() {
  const adminCenterResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/landmark/center/ALL`,
    { next: { revalidate: 60 * 60 * 24 } }
  );

  const adminCenterData = await adminCenterResponse.json();

  return <Home adminCenter={adminCenterData} />;
}
