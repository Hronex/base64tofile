import Base64ToFile from '../index';

test('Base64ToFile', (done) => {
	const f = new Base64ToFile('', '');

	expect(f).toBeInstanceOf(Base64ToFile);
	done();
});

describe('Get file extension', () => {
	it(`example.jpg must to be jpg`, (done) => {
		expect(Base64ToFile.fileExtension('example.jpg')).toBe('jpg');
		done();
	});
	it(`example.test.png must to be png`, (done) => {
		expect(Base64ToFile.fileExtension('example.test.png')).toBe('png');
		done();
	});
	it(`example.mp4 must to be mp4`, (done) => {
		expect(Base64ToFile.fileExtension('example.mp4')).toBe('mp4');
		done();
	});
	it(`.gitignore must to be gitignore`, (done) => {
		expect(Base64ToFile.fileExtension('.gitignore')).toBe('gitignore');
		done();
	});
});
