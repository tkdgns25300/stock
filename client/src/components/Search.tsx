import React, { useEffect, useState, useRef } from "react";
import StockItem from "./StockList";

const Search: React.FC = () => {
	const [inputValue, setInputValue] = useState<string>("");
	const [isHaveInputValue, setIsHaveInputValue] = useState<boolean>(false);
	const [wholeStockArray, setWholeStockArray] = useState<any[]>([]);
	const [dropDownList, setDropDownList] = useState<any[]>([]);
	const [dropDownItemIndex, setDropDownItemIndex] = useState<number>(-1);
	const dropDownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchStockList = async () => {
			try {
				const response = await fetch("http://localhost:8000/api/v1/company/stock-list");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setWholeStockArray(data.result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchStockList();
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
				setIsHaveInputValue(false);
				setDropDownList([]);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const showDropDownList = () => {
		if (inputValue === "") {
			setIsHaveInputValue(false);
			setDropDownList([]);
		} else {
			const choosenTextList = wholeStockArray
				.filter((textItem) => textItem.company_name.includes(inputValue) || textItem.stock_code.includes(inputValue))
				.slice(0, 10);
			setDropDownList(choosenTextList);
		}
	};

	const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		setIsHaveInputValue(true);
	};

	const clickDropDownItem = (clickedItem: any) => {
		setInputValue(clickedItem.company_name);
		setIsHaveInputValue(false);
	};

	const handleDropDownKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (isHaveInputValue) {
			if (event.key === "ArrowDown" && dropDownList.length - 1 > dropDownItemIndex) {
				setDropDownItemIndex(dropDownItemIndex + 1);
			}
			if (event.key === "ArrowUp" && dropDownItemIndex >= 0) setDropDownItemIndex(dropDownItemIndex - 1);
			if (event.key === "Enter" && dropDownItemIndex >= 0) {
				clickDropDownItem(dropDownList[dropDownItemIndex]);
				setDropDownItemIndex(-1);
			}
			if (event.key === "Escape") {
				setIsHaveInputValue(false);
				setDropDownList([]);
			}
		}
	};

	useEffect(showDropDownList, [inputValue]);

	return (
		<div className="relative w-1/2 mx-auto" ref={dropDownRef}>
			<div
				className={`bg-white bg-opacity-10 p-3 flex items-center justify-between ${
					isHaveInputValue ? "rounded-t-3xl" : "rounded-3xl"
				}`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-10 h-6 text-gray-200"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
					/>
				</svg>
				<input
					type="text"
					placeholder="회사명/종목 코드를 입력해주세요"
					value={inputValue}
					onChange={changeInputValue}
					onKeyDown={handleDropDownKey}
					className="flex-1 py-2 px-4 rounded-full bg-transparent border-none text-gray-200 placeholder-gray-400 focus:outline-none mx-2"
				/>
				{isHaveInputValue && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="cursor-pointer mx-5 mb-1 p-0 w-5 h-5 text-white"
					>
						<path d="M6 18L18 6M6 6l12 12" />
					</svg>
				)}
				{/* <div className="cursor-pointer text-white text-3xl -m-0 -p-0" onClick={() => setInputValue("")}>
						&times;
					</div>
				)} */}
			</div>

			{isHaveInputValue && (
				<div className="absolute w-full bg-white bg-opacity-10 rounded-b-3xl shadow-lg">
					<div className="pt-3 border-b-2 border-white border-opacity-25 w-11/12 mx-auto"></div>
					<ul className="w-full mx-auto pt-4 pb-6">
						{dropDownList.length === 0 && <li className="py-2 px-4 text-gray-200">해당하는 단어가 없습니다</li>}
						{dropDownList.map((dropDownItem, dropDownIndex) => {
							return (
								<li
									key={dropDownIndex}
									onClick={() => clickDropDownItem(dropDownItem)}
									onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
									className={`py-2 px-4 ${dropDownItemIndex === dropDownIndex ? "bg-gray-500" : ""}`}
								>
									<StockItem
										companyName={dropDownItem.company_name}
										stockCode={dropDownItem.stock_code}
										stockType={dropDownItem.stock_type}
									/>
								</li>
							);
						})}
					</ul>
					{/* <div>{dropDownList.length !== 0 && <span>현재 상장 종목 수 : {wholeStockArray.length}</span>}</div> */}
				</div>
			)}
		</div>
	);
};

export default Search;
