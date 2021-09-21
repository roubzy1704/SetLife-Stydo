import React, { useState } from "react";

import ProjectFormDesign from "../../components/Pages/Project/Form/ProjectFormDesign";

const FormControlHook = ({
	initialValues,
	onSubmit,
	formType,
	children,
	// toggleContBtn,
}) => {
	const [stepNumber, setStepNumber] = useState(0);
	const steps = React.Children.toArray(children);
	const [snapshot, setSnapshot] = useState(initialValues);

	const currentProjectPage = steps[stepNumber];
	const totalSteps = steps.length;
	const isLastStep = stepNumber === totalSteps - 1;

	const next = (values) => {
		setSnapshot(values);
		setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
	};

	const previous = (values) => {
		setSnapshot(values);
		setStepNumber(Math.max(stepNumber - 1, 0));
	};

	const handleSubmit = async (values, bag) => {
		if (currentProjectPage.props.onSubmit) {
			await currentProjectPage.props.onSubmit(values, bag);
		}
		if (isLastStep) {
			return onSubmit(values, bag);
		} else {
			bag.setTouched({});
			next(values);
		}
	};

	if (formType === "project") {
		return (
			<ProjectFormDesign
				snapshot={snapshot}
				handleSubmit={handleSubmit}
				currentProjectPage={currentProjectPage}
				stepNumber={stepNumber}
				totalSteps={totalSteps}
				previous={previous}
				isLastStep={isLastStep}
				next={next}
				// toggleContBtn={toggleContBtn}
			/>
		);
	} else {
		return <div> Auth Form</div>;
	}
};

export default FormControlHook;
