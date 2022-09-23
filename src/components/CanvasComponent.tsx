import React, { useEffect, useRef, useState } from "react";
import "../css/PlayerComponent.scss";

function CanvasComponent() {
	const canvasRef = useRef<null | any>(null);

	const draw = (ctx: any, frameCount: number) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fillStyle = "#000000";
		ctx.beginPath();
		ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
		ctx.fill();
	};

	useEffect(() => {
		if (!canvasRef) return;
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		let frameCount = 0;
		let animationFrameId: number;

		//Our draw came here
		const render = () => {
			frameCount++;
			draw(context, frameCount);
			animationFrameId = window.requestAnimationFrame(render);
		};
		render();

		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<div className={"upper-content"}>
			<canvas ref={canvasRef} />
		</div>
	);
}

export default CanvasComponent;
