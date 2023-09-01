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
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		let frameCount = 0;
		let animationFrameId: number;

		const rad = 14;
		const width = 302;
		const height = 152;
		let balls = [
			new Ball(0, 0, rad, width, height),
			new Ball(50, 50, rad, width, height),
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
			<canvas ref={canvasRef} />
		</div>
	);
}

export default CanvasComponent;
