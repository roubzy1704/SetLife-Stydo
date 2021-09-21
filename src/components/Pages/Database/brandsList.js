import React from "react";

const brandsList = ({ getSelection, database }) => {
	function handleClick(event) {
		// console.log(event.target.attributes.getNamedItem('name').value);
		if (database) {
			//this is the way to get a custom attribute (name) from an event object (Label)
			//https://stackoverflow.com/questions/20377837/how-to-access-custom-attributes-from-event-object-in-react
			getSelection(event.target.attributes.getNamedItem('name').value)
		}
		else {
			getSelection(event.target.id);
		}
	}
	return (
		<React.Fragment>
			<div className="scrollComponent center row sahar">
				<div className="col-1"></div>
				<div className="col-9">
					<div
						data-bs-spy="scroll"
						data-bs-target="#list-example"
						data-bs-offset="0"
						className="scrollspy-example">
						<h4 id="list-item-4">#</h4>
						<hr className="divider" />
						<label
							className="brandLink"
							onClick={handleClick}
							id="3-1-Phillip-Lim"
							name="3.1 Phillip Lim">
							3.1 Phillip Lim
						</label>
						<hr />
						<label className="brandLink" onClick={handleClick} id="6397">
							6397
						</label>
						<hr />
						<h4 id="list-item-1">A</h4>
						<hr className="divider" />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Armani-Exchange">
							A|X Armani Exchange
						</label>
						<hr />
						<label className="brandLink" onClick={handleClick} id="Adidas">
							Adidas
						</label>
						<hr />
						<h4 id="list-item-2">B</h4>
						<hr className="divider" />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Burberry"
							name="Burberry">
							Burberry
						</label>
						<hr />
						<label className="brandLink" onClick={handleClick} id="Balenciaga">
							Balenciaga
						</label>
						<hr />
						<h4 id="list-item-3">C</h4>
						<hr className="divider" />
						<label className="brandLink" onClick={handleClick} id="Chanel">
							Chanel
						</label>
						<hr />
						<label className="brandLink" onClick={handleClick} id="Chloé">
							Chloé
						</label>
						<hr />
						<h4 id="list-item-4">D</h4>
						<hr className="divider" />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Dolce & Gabbana">
							Dolce & Gabbana
						</label>
						<hr />
						<label className="brandLink" onClick={handleClick} id="Dior">
							Dior
						</label>
						<hr />
						<h4 id="list-item-5">E</h4>
						<hr className="divider" />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr />
						<h4 id="list-item-6">F</h4>
						<hr className="divider" />
						<label className="brandLink" onClick={handleClick} id="Fendi">
							Fendi
						</label>
						<hr />
						<h4 id="list-item-7">G</h4>
						<hr className="divider" />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Giorgio Armani">
							Giorgio Armani
						</label>
						<hr />
						<label className="brandLink" onClick={handleClick} id="Gucci">
							Gucci
						</label>
						<hr />
						<h4 id="list-item-8">H</h4>
						<hr className="divider" />
						<label className="brandLink" onClick={handleClick} id="Hermès">
							Hermès
						</label>
						<hr />
						<label className="brandLink" onClick={handleClick} id="Hugo Boss">
							Hugo Boss
						</label>
						<hr />
						<h4 id="list-item-9">I</h4>
						<hr className="divider" />
						{/* <label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label> 
						<hr />*/}
						<h4 id="list-item-10">J</h4>
						<hr className="divider" />
						<label className="brandLink" onClick={handleClick} id="Jason Wu">
							Jason Wu
						</label>
						<hr />
						<h4 id="list-item-11">K</h4>
						<hr className="divider" />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Kenneth Cole">
							Kenneth Cole
						</label>
						<hr />
						<h4 id="list-item-12">L</h4>
						<hr className="divider" />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Louis-Vuitton"
							name="Louis Vuitton">
							Louis Vuitton
						</label>
						<hr />
						<label className="brandLink" onClick={handleClick} id="Lela Rose">
							Lela Rose
						</label>
						<hr />
						<h4 id="list-item-13">M</h4>
						<hr className="divider" />
						{/* <label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label> 
						<hr />*/}
						<h4 id="list-item-14">N</h4>
						<hr className="divider" />
						{/* <label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr /> */}
						<h4 id="list-item-15">O</h4>
						<hr className="divider" />
						{/* <label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr /> */}
						<h4 id="list-item-16">P</h4>
						<hr className="divider" />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Paco Rabanne">
							Paco Rabanne
						</label>
						<hr />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Polo Ralph Lauren">
							Polo Ralph Lauren
						</label>
						<hr />
						<h4 id="list-item-17">Q</h4>
						<hr className="divider" />
						{/* <label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr /> */}
						<h4 id="list-item-18">R</h4>
						<hr className="divider" />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Roberto Cavalli">
							Roberto Cavalli
						</label>
						{/* <hr />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label> */}
						<hr />
						<h4 id="list-item-19">S</h4>
						<hr className="divider" />
						{/* <label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr /> */}
						<h4 id="list-item-20">T</h4>
						<hr className="divider" />
						<label className="brandLink" onClick={handleClick} id="Tom Ford">
							Tom Ford
						</label>
						<hr />
						<label className="brandLink" onClick={handleClick} id="Tory Burch">
							Tory Burch
						</label>
						<hr />
						<h4 id="list-item-21">U</h4>
						<hr className="divider" />
						{/* <label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr /> */}
						<h4 id="list-item-22">V</h4>
						<hr className="divider" />
						<label className="brandLink" onClick={handleClick} id="Valentino">
							Valentino
						</label>
						<hr />
						<label className="brandLink" onClick={handleClick} id="Versace">
							Versace
						</label>
						<hr />
						<h4 id="list-item-23">W</h4>
						<hr className="divider" />
						{/* <label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr /> */}
						<h4 id="list-item-24">X</h4>
						<hr className="divider" />
						{/* <label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr /> */}
						<h4 id="list-item-25">Y</h4>
						<hr className="divider" />
						<label className="brandLink" onClick={handleClick} id="Y/Project">
							Y/Project
						</label>
						<hr />
						{/* <label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr /> */}
						<h4 id="list-item-26">Z</h4>
						<hr className="divider" />
						{/* <label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label>
						<hr />
						<label
							className="brandLink"
							onClick={handleClick}
							id="Emporio Armani">
							Emporio Armani
						</label> */}
					</div>
				</div>
				<div className="col-2">
					<div id="list-example" className="list-group left">
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-4">
							#
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-1">
							A
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-2">
							B
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-3">
							C
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-4">
							D
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-5">
							E
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-6">
							F
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-7">
							G
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-8">
							H
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-9">
							I
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-10">
							J
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-11">
							K
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-12">
							L
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-13">
							M
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-14">
							N
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-15">
							O
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-16">
							P
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-17">
							Q
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-18">
							R
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-19">
							S
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-20">
							T
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-21">
							U
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-22">
							V
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-23">
							W
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-24">
							X
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-25">
							Y
						</a>
						<a
							className="list-group-item list-group-item-action"
							href="#list-item-26">
							Z
						</a>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default brandsList;
