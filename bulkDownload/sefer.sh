base="https://cdn.tanachstudy.com/archives"
part="Neviim%20Rishonim"
directory="Yehoshua"
filename="yehoshua-"

for i in {1..24}; do
  url="$base/$part/$directory/$filename$i.mp3"
  wget "https://cdn.tanachstudy.com/archives/Neviim%20Rishonim/Yehoshua/yehoshua-{1..24}.mp3" -P "./test"
done


curl -O https://cdn.tanachstudy.com/archives/Neviim%20Rishonim/Yehoshua/yehoshua-[1-24].mp3
