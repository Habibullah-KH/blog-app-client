import { Navbar } from "@/components/layout/Navbar";

export default function Commonlayout({children}: {children: React.ReactNode}) {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}
