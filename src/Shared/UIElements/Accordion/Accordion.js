import React, { useState } from "react";

import "./Accordion.css";

const Accordion = ({ title, content }) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className="accordion-item">
			<div className="accordion-title" onClick={() => setIsActive(!isActive)}>
				<div>{title}</div>
				<div style={{ fontSize: "25px" }}>{isActive ? "-" : "+"}</div>
			</div>
			{isActive && (
				<div className="accordion-content">
					<div className="card">
						<div className="card-header">
							{content.first_name} {"   "} {content.last_name}
						</div>
						<ul className="list-group list-group-flush">
							<li className="list-group-item">
								<p>
									<a href={`mailto:${content.email}`}>{content.email}</a>
								</p>
								<p>
									<a href={`tel:${content.phone}`}>{content.phone}</a>
								</p>
							</li>
						</ul>
					</div>
					<div className="card">
						<div className="card-header">
							{content.first_name} {"   "} {content.last_name}
						</div>
						<ul className="list-group list-group-flush">
							<li className="list-group-item">
								<p>{content.email}</p>
								<p>{content.phone}</p>
								<p>{content.address}</p>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default Accordion;
