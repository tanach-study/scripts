directory='input/*'
prefix='prefix.mp3'

output='out'

mkdir $output

for file in $directory; do
  name=${file##*/}
  ffmpeg -i $prefix -i $file -filter_complex [0:a][1:a]concat=n=2:v=0:a=1 -b:a 80k -ar 32000 "$output/$name"
done

aws s3 cp --recursive $output 's3://cdn.tanachstudy.com/archives/'
