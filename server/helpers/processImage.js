import {publicPath} from 'config';
import lwip from 'lwip';
import fse from 'fs-extra';
import {createHash} from 'crypto';

export function processUserImage({file, type}) {
  return new Promise((resolve, reject) => {
    lwip.open(file, type.replace(/^.+\//, ''), (err, image) => {
      if (err) reject(err);
      const size = Math.min(image.width(), image.height());
      image
        .batch()
        .crop(size, size)
        .resize(128, 128)
        .toBuffer('jpg', (err, buf) => {
          if (err) reject(err);
          const url = `/userpics/${createHash('sha1').update(buf).digest('hex')}`;
          const path = `${publicPath}/${url}`;
          fse.stat(path, (err, stats) => {
            if (!stats) fse.outputFile(path, buf, err => {
              if (err) reject(err);
              else resolve(url);
            });
            else resolve(url);
          });
        });
    });
  });
}
