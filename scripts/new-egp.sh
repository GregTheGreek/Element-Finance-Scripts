set -e

egp_number=$1
base_dir=egps
template=$base_dir/_template
dir=$base_dir/"egp"-$egp_number

mkdir $dir
cp $template $dir/"egp"-$egp_number.ts