import pandas as pd

def main():
    no2_data = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/no2Temp.csv")
    co2_data = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/co2Temp.csv")
    so2_data = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/so2Temp.csv")
    ozone_data = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/ozone_1.csv")
    ozone_data_2 = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/ozone_2.csv")

    no2_text = '/Users/karanasthana/Personal/usapd-fr/Scripts/no2_sql.txt'
    so2_text = '/Users/karanasthana/Personal/usapd-fr/Scripts/so2_sql.txt'
    co2_text = '/Users/karanasthana/Personal/usapd-fr/Scripts/co2_sql.txt'
    ozone_text = '/Users/karanasthana/Personal/usapd-fr/Scripts/ozone_sql.txt'

    createTextFile(no2_data, no2_text)
    # createTextFile(ozone_data, ozone_text)
    # createTextFile(ozone_data_2, ozone_text)

def createTextFile(input_file, output_file):
    input_file = input_file[1:]
    output_file_opened = open(output_file, 'a+')

    s = 'INSERT INTO OBSERVATION VALUES ('
    for ndx, row in input_file.iterrows():
        for key, val in enumerate(row):
            s = s + str(val) + ','    
            
        s = s[:-1] + ');'
        output_file_opened.write(s)

main()