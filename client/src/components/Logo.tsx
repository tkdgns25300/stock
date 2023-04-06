import React from "react";
import { Link } from "react-router-dom";
import LogoSvg from "../assets/images/logo1.svg";

const Logo: React.FC = () => {
	return (
		<Link to="/">
			<img src={LogoSvg} alt="Logo" className="absolute w-56 p-0 m-6" />
		</Link>
	);
};

export default Logo;
