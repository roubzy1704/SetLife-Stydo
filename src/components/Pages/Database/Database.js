import React, { useState } from "react";

import BrandsList from "./brandsList";
import Button from "../../../Shared/UIElements/Button/Button";

import "./Database.css";

const Database = () => {
	const [checkList, setCheckList] = useState({
		womenswear: false,
		menswear: false,
		accessories: false,
		swimwear: false,
		shoes: false,
		multilabelShowroom: false,
		lingerie: false,
	});

	const handleCheckboxClick = (event) => {
		console.log("click");
		console.log(event.target.name);
		switch (event.target.name) {
			case "womenswear":
				setCheckList({
					...checkList,
					womenswear: !checkList.womenswear,
				});
				break;
			case "menswear":
				setCheckList({
					...checkList,
					menswear: !checkList.menswear,
				});
				break;
			case "accessories":
				setCheckList({
					...checkList,
					accessories: !checkList.accessories,
				});
				break;
			case "swimwear":
				setCheckList({
					...checkList,
					swimwear: !checkList.swimwear,
				});
				break;
			case "shoes":
				setCheckList({
					...checkList,
					shoes: !checkList.shoes,
				});
				break;
			case "multilabelShowroom":
				setCheckList({
					...checkList,
					multilabelShowroom: !checkList.multilabelShowroom,
				});
				break;
			case "lingerie":
				setCheckList({
					...checkList,
					lingerie: !checkList.lingerie,
				});
				break;
			default:
				break;
		}
		console.log(checkList);
	};

	const handleSubmit = () => {
		console.log(checkList);
	};

	return (
		<div className="center relative">
			<div className="row">
				<div className="col-md-2 pageNav">
					<span style={{ textDecoration: "underline" }}>
						<Button to="/dashBoard">Home</Button>
					</span>
					/ Database
				</div>
				<div className="col col-md-9">
					<h1 className="pageTitle">DATABASE</h1>
				</div>
				<div className="col-md-1"></div>
			</div>
			{/* SEARCH */}
			<div className="row fileDisplay sahar">
				{/* COLUMN 1 */}
				<div className="col col-md-3 left">
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value={checkList.womenswear}
							name="womenswear"
							onClick={handleCheckboxClick}
						/>
						<label className="form-check-label" htmlFor="flexCheckDefault">
							Womenswear
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value={checkList.menswear}
							name="menswear"
							onClick={handleCheckboxClick}
						/>
						<label className="form-check-label" htmlFor="flexCheckDefault">
							Menswear
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value={checkList.accessories}
							name="accessories"
							onClick={handleCheckboxClick}
						/>
						<label className="form-check-label" htmlFor="flexCheckDefault">
							Accessories
						</label>
					</div>
				</div>
				{/* COLUMN 2 */}
				<div className="col col-md-3 left">
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value={checkList.swimwear}
							name="swimwear"
							onClick={handleCheckboxClick}
						/>
						<label className="form-check-label" htmlFor="flexCheckChecked">
							Swimwear
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value={checkList.shoes}
							name="shoes"
							onClick={handleCheckboxClick}
						/>
						<label className="form-check-label" htmlFor="flexCheckDefault">
							Shoes
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value={checkList.multilabelShowroom}
							name="multilabelShowroom"
							onClick={handleCheckboxClick}
						/>
						<label className="form-check-label" htmlFor="flexCheckDefault">
							Multilabel Showroom
						</label>
					</div>
				</div>
				{/* COLUMN 3 */}
				<div className="col col-md-3 left">
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value={checkList.lingerie}
							name="lingerie"
							onClick={handleCheckboxClick}
						/>
						<label className="form-check-label" htmlFor="flexCheckChecked">
							Lingerie
						</label>
					</div>
					{/* <div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value={checkList.womenswear}
							name="option1"
						/>
						<label className="form-check-label" htmlFor="flexCheckDefault">
							Option 1
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value={checkList.womenswear}
							name="option2"
						/>
						<label className="form-check-label" htmlFor="flexCheckDefault">
							Option 2
						</label>
					</div> */}
				</div>
				<div className="col col-md-3 searchButton">
					<span>
						<Button onClick={handleSubmit}>Search</Button>
					</span>
				</div>
			</div>
			{/* BRANDS */}
			<BrandsList />
		</div>
	);
};

export default Database;
