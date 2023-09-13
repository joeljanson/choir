import * as Tone from "tone";
import { outputs } from "./constants";

export class Audio {
	constructor() {
		console.log("how many master channels?");
		this.masterChannel = new Tone.Channel()
			.receive(outputs.channel1)
			.toDestination();
	}
}

export function normalize(buffer) {
	let totalMax = 0;
	let buffersArray;
	console.log(buffer.numberOfChannels);
	if (buffer.numberOfChannels < 2) {
		buffersArray = [buffer.getChannelData(0)];
	} else if (buffer.numberOfChannels > 1) {
		buffersArray = buffer.toArray();
	}

	buffersArray.forEach((currentBuffer) => {
		let currentMax = currentBuffer.reduce(function (a, b) {
			return Math.max(a, b);
		}); // 4
		totalMax = totalMax > currentMax ? totalMax : currentMax;
	});

	let normalizedBuffers = [];

	buffersArray.forEach((currentBuffer) => {
		let newBuffer = [];
		currentBuffer.forEach((element) => {
			newBuffer.push(element * (1 / totalMax));
		});
		let normalizedCurrentBuffer = Float32Array.from(newBuffer);
		normalizedBuffers.push(normalizedCurrentBuffer);
	});

	const finalBuffer = Tone.Buffer.fromArray(normalizedBuffers);
	//console.log(finalBuffer);
	return finalBuffer;
}
