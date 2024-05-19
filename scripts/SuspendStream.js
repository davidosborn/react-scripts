import stream from 'node:stream'

export default class SuspendStream extends stream.Writable {
	constructor(stream) {
		super()
		this.stream = stream
	}

	_write(chunk, encoding, callback) {
		if (this.restored) {
			return this.stream._write(chunk, encoding, callback)
		}

		const buffer = Buffer.from(chunk, encoding)
		this.buffer = this.buffer
			? Buffer.concat([this.buffer, buffer])
			: buffer

		callback()
	}

	restore() {
		if (this.restored) {
			return
		}

		this.stream.write('\n')

		if (this.buffer) {
			this.stream.write(this.buffer)
			this.buffer.fill()
		}

		this.restored = true
	}
}
