import Image from "next/image";
import Pagination from "./issues/_components/Pagination";

export default function Home() {
  return (
    <div>
      <Pagination itemCount={100} pageSize={20} currentPage={5} />
    </div>
  );
}
