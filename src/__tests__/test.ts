import Base64ToFile from '../index';

test('Base64ToFile', done => {
	const f = new Base64ToFile('', '');

	expect(f).toBeInstanceOf(Base64ToFile);
	done();
});
