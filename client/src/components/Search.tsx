import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StockItem from "./StockList";

const Search: React.FC = () => {
	const [inputValue, setInputValue] = useState<string>("");
	const [isHaveInputValue, setIsHaveInputValue] = useState<boolean>(false);
	const [wholeStockList, setWholeStockList] = useState<any[]>([]);
	const [dropDownList, setDropDownList] = useState<any[]>([]);
	const [dropDownItemIndex, setDropDownItemIndex] = useState<number>(-1);
	const [selectedStock, setSelectedStock] = useState<any>(null);
	const dropDownRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchStockList = async () => {
			try {
				const response = await fetch("http://localhost:8000/api/v1/company/stock-list");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setWholeStockList(data.result);
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

	useEffect(() => {
		if (inputValue === "") {
			setIsHaveInputValue(false);
			setDropDownList([]);
		} else {
			const choosenStockList = wholeStockList
				.filter(
					(textItem) =>
						textItem.company_name.toLowerCase().includes(inputValue.toLowerCase()) ||
						textItem.stock_code.includes(inputValue),
				)
				.slice(0, 10);
			setDropDownList(choosenStockList);
		}
	}, [inputValue]);

	const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		setIsHaveInputValue(true);
	};

	const clickDropDownItem = (clickedItem: any) => {
		setInputValue(clickedItem.company_name);
		setSelectedStock(clickedItem);
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

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (selectedStock) {
			const queryString = `?companyName=${selectedStock.company_name}&stockCode=${selectedStock.stock_code}&stockType=${selectedStock.stock_type}`;
			navigate(`/result${queryString}`);
		}
	};
	return (
		<div className="relative w-1/2 mx-auto z-10" ref={dropDownRef}>
			<form onSubmit={handleSubmit}>
				<div
					className={`bg-neutral-900 px-3 py-2 flex items-center justify-between ${
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
						className="flex-1 py-2 px-4 rounded-full bg-transparent border-none text-gray-200 placeholder-gray-400 focus:outline-none mx-2 text-lg"
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
							onClick={() => setInputValue("")}
						>
							<path d="M6 18L18 6M6 6l12 12" />
						</svg>
					)}
				</div>

				{isHaveInputValue && (
					<div className="absolute w-full overflow-hidden bg-neutral-900 rounded-b-3xl shadow-lg z-10">
						<div className="border-b-2 border-white border-opacity-25 w-11/12 mx-auto m-0"></div>
						<ul className="w-full mx-auto pt-4">
							{dropDownList.length === 0 && <li className="p-4 text-gray-200">해당하는 단어가 없습니다</li>}
							{dropDownList.map((dropDownItem, dropDownIndex) => {
								return (
									<li
										key={dropDownIndex}
										onClick={() => clickDropDownItem(dropDownItem)}
										onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
										className={`py-2 px-4 ${dropDownItemIndex === dropDownIndex ? "bg-gray-700" : ""}`}
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
					</div>
				)}
			</form>
		</div>
	);
};

export default Search;
