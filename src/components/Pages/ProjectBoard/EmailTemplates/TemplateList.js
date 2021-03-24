import React from "react";

import TemplateEntry from "./TemplateEntry/TemplateEntry";

const TemplateList = (props) => {
	const { templateList } = props;

	let defaultValue = 0;

	if (templateList.length === 0) {
		return (
			<div>
				<h3>No templates have been created</h3>
				<h5>Create One Above</h5>
			</div>
		);
	}

	return (
		<React.Fragment>
			<div className="container">
				<div className="row" style={{ marginBottom: "40px" }}>
					<div className="col-sm-8 left">SAVED TEMPLATES</div>
					<div className="col-sm-2 right">DEFAULT</div>
				</div>
			</div>

			{templateList.map((template) => {
				return (
					<TemplateEntry
						key={template.id}
						id={template.id}
						templateTitle={template.templateTitle}
						message={template.message}
						deleteTemplate={props.deleteTemplate}
						defaultValue={defaultValue}
					/>
				);
			})}
		</React.Fragment>
	);
};

export default TemplateList;
