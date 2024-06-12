// 이미지 파일 타입 선언
declare module "*.jpg" {
	const value: string;
	export default value;
}

declare module "*.png" {
	const value: string;
	export default value;
}

// CSS 파일 타입 선언
declare module "*.css" {
	const content: { [className: string]: string };
	export default content;
}

// SVG 파일 타입 선언
declare module "*.svg" {
	import * as React from "react";
	export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}
