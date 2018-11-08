export default class Base64ToFile
{
	private view: typeof window;

	readonly saveLink: HTMLAnchorElement;
	readonly canUseSaveLink: boolean;
	readonly forceSaveableType: string;

	private blob: Blob;
	private name: string;

	constructor(base64: string, name: string)
	{
		this.view = window;
		this.saveLink = window.document.createElementNS('http://www.w3.org/1999/xhtml', 'a') as HTMLAnchorElement;
		this.canUseSaveLink = 'download' in this.saveLink;
		this.forceSaveableType = this.extensionToMime();

		let ext = Base64ToFile.fileExtension(name);
		let type = this.extensionToMime(ext);

		if ( !type ) {
			console.warn('Unknown file format, use "%s"', this.forceSaveableType);
			type = this.forceSaveableType;
		}

		this.blob = this.base64toBlob(base64, type);
		this.name = name;
	}

	private get url(): typeof URL
	{
		return this.view.URL;
	}

	private click(node: HTMLElement): void
	{
		let event = new MouseEvent('click');
		node.dispatchEvent(event);
	}

	private autoBom(): Blob
	{
		let blob = this.blob;

		if ( /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type) ) {
			return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
		}

		return blob;
	}

	// Конвертация base64 строки в Blob объект
	private base64toBlob(base64: string, contentType: string): Blob
	{
		let sliceSize = 512;

		let byteCharacters = atob(base64);
		let byteArrays = [];

		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			let slice = byteCharacters.slice(offset, offset + sliceSize);

			let byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			let byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		return new Blob(byteArrays, { type: contentType });
	}

	// Возвращает mime тип по расширению
	private extensionToMime(extension = ''): string
	{
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
				return '';
		}
	}

	// Возвращает расширение файла по его имени с расширением
	public static fileExtension(fileName: string): string
	{
		let match = fileName.match(/[^.][aA-zZ0-9]+$/i);

		return !match ? '' : match[0].toLowerCase();
	}

	public save(): void
	{
		let blob = this.autoBom();

		let objectUrl = this.url.createObjectURL(blob);

		if ( this.canUseSaveLink ) {
			window.setTimeout(() => {
				this.saveLink.href = objectUrl;
				this.saveLink.download = this.name;
				this.click(this.saveLink);
			});

			return;
		}

		if ( FileReader ) {
			let reader = new FileReader();

			reader.onloadend = () => {
				let url = reader.result as string;
				let popup = this.view.open(url, '_blank');
				if (!popup) {
					this.view.location.href = url;
				}
			};

			reader.readAsDataURL(blob);

			return;
		}

		if (blob.type === this.forceSaveableType) {
			this.view.location.href = objectUrl;
		} else if ( !this.view.open(objectUrl, '_blank') ) {
			this.view.location.href = objectUrl;
		}
	}
}