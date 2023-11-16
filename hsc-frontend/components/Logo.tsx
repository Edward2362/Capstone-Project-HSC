import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import React from "react";

const Logo = (props: SvgIconProps) => {
	return (
		<SvgIcon viewBox="0 0 700 701" {...props}>
			<path d="M280 163.336C247.803 163.336 221.667 189.472 221.667 221.67H245C245 202.419 260.749 186.67 280 186.67C299.251 186.67 315 202.419 315 221.67H338.333C338.333 189.472 312.197 163.336 280 163.336Z" />
			<path d="M420 163.336C387.803 163.336 361.667 189.472 361.667 221.67H385C385 202.419 400.749 186.67 420 186.67C439.251 186.67 455 202.419 455 221.67H478.333C478.333 189.472 452.197 163.336 420 163.336Z" />
			<path d="M653.333 408.337C627.552 408.337 606.666 429.222 606.666 455.003C606.666 459.67 607.599 464.102 608.885 468.305L536.667 540.404V408.221C536.667 401.805 531.417 396.555 525 396.555H385V361.555H490C509.251 361.555 525 345.805 525 326.555V279.888H571.667C591.031 279.888 606.667 264.252 606.667 244.888C606.667 225.524 591.031 209.888 571.667 209.888V67.9013C585.197 63.1201 595 50.2867 595 35C595 15.636 579.364 0 560 0C540.636 0 525 15.636 525 35C525 50.1667 534.802 63 548.333 67.9013V209.995H525V139.995C525 120.744 509.251 104.995 490 104.995H210C190.749 104.995 175 120.744 175 139.995V209.995H128.333C108.969 209.995 93.3332 225.631 93.3332 244.995C93.3332 264.359 108.969 279.995 128.333 279.995H175V326.661C175 345.912 190.749 361.661 210 361.661H315V396.661H175C168.583 396.661 163.333 401.911 163.333 408.328V540.511L91.1145 468.412C92.3958 464.214 93.3333 459.777 93.3333 455.11C93.3333 429.329 72.448 408.443 46.6667 408.443C20.8853 408.443 0 429.329 0 455.11C0 480.891 20.8853 501.777 46.6667 501.777C50.2812 501.777 53.7812 501.308 57.2812 500.495L163.333 606.547V688.449C163.333 694.865 168.583 700.115 175 700.115H525C531.417 700.115 536.667 694.865 536.667 688.449V606.547L642.719 500.495C646.104 501.313 649.604 501.777 653.333 501.777C679.114 501.777 700 480.891 700 455.11C700 429.329 679.114 408.443 653.333 408.443V408.337ZM210 338.337C203.583 338.337 198.333 333.087 198.333 326.67V140.003C198.333 133.587 203.583 128.337 210 128.337H490C496.416 128.337 501.666 133.587 501.666 140.003V326.67C501.666 333.087 496.416 338.337 490 338.337H210ZM443.333 577.51H379.166V641.677H320.833V577.51H256.666V519.177H320.833V455.01H379.166V519.177H443.333V577.51Z" />
		</SvgIcon>
	);
};

export default Logo;