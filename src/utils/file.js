export class File {
	constructor(file, pInst) {
		/**
		 * Underlying File object. All normal File methods can be called on this.
		 *
		 * @property file
		 */
		this.file = file;

		this._pInst = pInst;

		// Splitting out the file type into two components
		// This makes determining if image or text etc simpler
		const typeList = file.type.split("/");
		/**
		 * File type (image, text, etc.)
		 *
		 * @property type
		 */
		this.type = typeList[0];
		/**
		 * File subtype (usually the file extension jpg, png, xml, etc.)
		 *
		 * @property subtype
		 */
		this.subtype = typeList[1];
		/**
		 * File name
		 *
		 * @property name
		 */
		this.name = file.name;
		/**
		 * File size
		 *
		 * @property size
		 */
		this.size = file.size;

		/**
		 * URL string containing either image data, the text contents of the file or
		 * a parsed object if file is JSON and p5.XML if XML
		 *
		 * @property data
		 */
		this.data = undefined;
	}

	static load(f, callback) {
		// Text or data?
		// This should likely be improved
		if (/^text\//.test(f.type) || f.type === "application/json") {
			this.createLoader(f, callback).readAsText(f);
		} else if (!/^(video|audio)\//.test(f.type)) {
			this.createLoader(f, callback).readAsDataURL(f);
		} else {
			const file = new File(f);
			file.data = URL.createObjectURL(f);
			callback(file);
		}
	}

	static createLoader(theFile, callback) {
		const reader = new FileReader();
		reader.onload = function (e) {
			const p5file = new File(theFile);
			if (p5file.file.type === "application/json") {
				// Parse JSON and store the result in data
				p5file.data = JSON.parse(e.target.result);
			} else if (p5file.file.type === "text/xml") {
				// Parse XML, wrap it in p5.XML and store the result in data
				console.log("File is in xml-format");
			} else {
				p5file.data = e.target.result;
			}
			callback(p5file);
		};
		return reader;
	}
}
