import * as Tone from "tone";
import { outputs } from "./constants";

export class Audio {
	constructor() {
		this.masterChannel = new Tone.Channel()
			.receive(outputs.channel1)
			.toDestination();
	}
}
