import { Channel } from "tone";

export default class ExtendedChannel extends Channel {
	/**
	 * Receive audio from a channel which was connected with [[send]].
	 * @param name The channel name to receive audio from.
	 */
	stopReceive(name) {
		const bus = this._getBus(name);
		bus.disconnect(this);
		return this;
	}
}
