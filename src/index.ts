export default class Base64ToFile {
	// Returns file extension by file name
	public static fileExtension(fileName: string): string {
		const match = fileName.match(/[^.][aA-zZ0-9]+$/i);

		return !match ? '' : match[0].toLowerCase();
	}

	private view: typeof window;
	private saveLink: HTMLAnchorElement;
	private canUseSaveLink: boolean;
	private forceSaveableType: string;
	private blob: Blob;

	private name: string;

	constructor(base64: string, name: string) {
		this.view = window;
		this.saveLink = window.document.createElementNS('http://www.w3.org/1999/xhtml', 'a') as HTMLAnchorElement;
		this.canUseSaveLink = 'download' in this.saveLink;
		this.forceSaveableType = this.extensionToMime();

		const ext = Base64ToFile.fileExtension(name);
		const type = this.extensionToMime(ext) || this.forceSaveableType;

		this.blob = this.base64toBlob(base64, type);
		this.name = name;
	}

	public save(): void {
		const blob = this.autoBom();
		const objectUrl = this.view.URL.createObjectURL(blob);

		if (this.canUseSaveLink) {
			window.setTimeout(() => {
				this.saveLink.href = objectUrl;
				this.saveLink.download = this.name;
				this.click(this.saveLink);
			});

			return;
		}

		if (FileReader) {
			const reader = new FileReader();

			reader.onloadend = () => {
				const url = reader.result as string;
				const popup = this.view.open(url, '_blank');
				if (!popup) {
					this.view.location.href = url;
				}
			};

			reader.readAsDataURL(blob);

			return;
		}

		if (blob.type === this.forceSaveableType) {
			this.view.location.href = objectUrl;
		} else if (!this.view.open(objectUrl, '_blank')) {
			this.view.location.href = objectUrl;
		}
	}

	private click(node: HTMLElement): void {
		node.dispatchEvent(new MouseEvent('click'));
	}

	private autoBom(): Blob {
		const blob = this.blob;

		if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
			return new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type });
		}

		return blob;
	}

	// Converts base64 string to Blob object
	private base64toBlob(base64: string, contentType: string): Blob {
		const sliceSize = 512;
		const byteCharacters = atob(base64);
		const byteArrays = [];

		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			const slice = byteCharacters.slice(offset, offset + sliceSize);

			const byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			const byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		return new Blob(byteArrays, { type: contentType });
	}

	// Returns mime type by extension
	private extensionToMime(extension = ''): string {
		switch (extension) {
			case 'jpeg':
			case 'jpg':
				return 'image/jpeg';
			case 'png':
				return 'image/png';
			case 'gif':
				return 'image/gif';
			case 'log':
			case 'txt':
				return 'text/plain';
			case 'rtf':
				return 'text/richtext';
			case 'pdf':
				return 'application/pdf';
			default:
				return 'application/octet-stream';
		}
	}
}
