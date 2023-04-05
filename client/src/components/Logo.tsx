import React from "react";
import { Link } from "react-router-dom";
import LogoSvg from "../assets/images/logo3.svg";

const Logo: React.FC = () => {
	return (
		<Link to="/">
			<img src={LogoSvg} alt="Logo" className="absolute w-40 mx-6 my-8" />
		</Link>
	);
};

export default Logo;
