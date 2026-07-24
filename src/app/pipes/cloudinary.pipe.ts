import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cloudinary'
})
export class CloudinaryPipe implements PipeTransform {

transform(url: string | null | undefined, width?: number): string {
console.log('le mando url y width',  url, width)

if (!url) {
      return '';
    }

    if (!url.includes('res.cloudinary.com')) {
      return url;
    }

    const uploadIndex = url.indexOf('/upload/');

    if (uploadIndex === -1) {
      return url;
    }

    const before = url.substring(0, uploadIndex + 8); 
    const after = url.substring(uploadIndex + 8);

    const firstSlash = after.indexOf('/');
const transformation = after.substring(0, firstSlash);
const rest = after.substring(firstSlash + 1);

    if (/^v\d+$/.test(transformation)) {

  const transforms = [
    width ? `w_${width}` : null,
    'dpr_auto',
    'f_auto',
    'q_auto'
  ]
    .filter(Boolean)
    .join(',');
console.log('no tiene', before, transforms, after)

  return `${before}${transforms}/${after}`;
}

const currentTransforms = transformation.split(',');

if (width) {
  currentTransforms.push(`w_${width}`);
}

if (!currentTransforms.includes('f_auto')) {
  currentTransforms.push('f_auto');
}

if (!currentTransforms.includes('q_auto')) {
  currentTransforms.push('q_auto');
}

console.log('ya tiene', before, currentTransforms.join(','), rest)
return `${before}${currentTransforms.join(',')}/${rest}`;

}
}
