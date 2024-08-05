import { Link } from 'react-router-dom';

export default function Redirect({ label, href, to }) {
    return (
        <p className='text-center'>{label} <Link className='text-[#08bcf2] font-semibold underline' to={to}>{href}</Link></p>
    );
}