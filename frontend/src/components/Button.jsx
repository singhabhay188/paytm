export default function Button({btntext,onClick}) {
  return (
    <button onClick={onClick} className="w-[90%] mx-auto block p-2 rounded-md bg-[#08bcf2] text-white font-semibold">{btntext}</button>
  )
}