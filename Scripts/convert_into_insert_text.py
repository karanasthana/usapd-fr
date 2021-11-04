import pandas as pd

def main():
    no2_data = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/no2_1.csv")
    ozone_data = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/ozone1.csv")
    ozone_data_2 = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/Scripts/ozone2.csv")

    no2_text = '/Users/karanasthana/Personal/usapd-fr/Scripts/no2_text.csv'
    ozone_text = '/Users/karanasthana/Personal/usapd-fr/Scripts/no2_text.csv'

    createTextFile(no2_data, no2_text)
    createTextFile(ozone_data, ozone_text)
    createTextFile(ozone_data_2, ozone_text)

def createTextFile(input_file, output_file):
    input_file = input_file[1:]

    for ndx, row in input_file.iterrows():
        # Insert into output_file here.
        print('test')

main()