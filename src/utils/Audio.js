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
