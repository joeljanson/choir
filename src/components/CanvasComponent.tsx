import React, { useEffect, useRef } from "react";
import "../css/CanvasComponent.scss";
import { Ball } from "../utils/Ball";

function CanvasComponent() {
	const canvasRef = useRef<null | any>(null);

	const draw = (ctx: any, frameCount: number) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.fillStyle = "#000000";
		ctx.beginPath();
		ctx.arc(20, 20, 20 * Math.sin(frameCount * 0.005) ** 2, 0, 2 * Math.PI);
		ctx.fill();
	};

	useEffect(() => {
		if (!canvasRef) return;

		// Get the parent element's size
		const parentElement = canvasRef.current.parentElement;
		if (!parentElement) return;

		const canvas = canvasRef.current;
		// Set canvas dimensions to match the parent's size
		canvasRef.current.width = parentElement.clientWidth;
		canvasRef.current.height = parentElement.clientHeight;
		const context = canvas.getContext("2d");
		let frameCount = 0;
		let animationFrameId: number;

		const rad = 14;
		const width = parentElement.clientWidth;
		const height = parentElement.clientHeight;
		let balls = [
			new Ball(
				Math.random() * width,
				Math.random() * height,
				rad,
				width,
				height
			),
			new Ball(
				Math.random() * width,
				Math.random() * height,
				rad,
				width,
				height
			),
		];

		//Our draw came here
		const render = () => {
			frameCount++;
			draw(context, frameCount);
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
			for (let i = 0; i < balls.length; i++) {
				let b = balls[i];
				b.update();
				//b.display();
				context.fillStyle = "#000000";
				context.beginPath();
				context.arc(b.position.x, b.position.y, b.r, b.r, 1);
				context.fill();
				context.closePath();

				b.checkBoundaryCollision();
				for (let j = 0; j < balls.length; j++) {
					if (j !== i) {
						b.checkCollision(balls[j]);
					}
				}
			}

			animationFrameId = window.requestAnimationFrame(render);
		};
		render();

		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<div className={"canvas-component"}>
			<p>hello hohoh oahegoh</p>
			<canvas ref={canvasRef} />
		</div>
	);
}

export default CanvasComponent;
