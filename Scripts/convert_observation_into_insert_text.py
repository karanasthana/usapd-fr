import pandas as pd

def main():
    no2_data = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/no2-observation-final.csv")
    co_data = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/co-observation-final.csv")
    so2_data = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/so2-observation-final.csv")
    ozone_data = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/ozone-observation-final_1.csv")
    ozone_data_2 = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/ozone-observation-final_2.csv")

    no2_text = '/Users/karanasthana/Personal/usapd-fr/Scripts/no2_sql.txt'
    so2_text = '/Users/karanasthana/Personal/usapd-fr/Scripts/so2_sql.txt'
    co_text = '/Users/karanasthana/Personal/usapd-fr/Scripts/co_sql.txt'
    ozone_text = '/Users/karanasthana/Personal/usapd-fr/Scripts/ozone_sql.txt'

    createTextFile(no2_data, no2_text)
    createTextFile(co_data, co_text)
    createTextFile(so2_data, so2_text)
    createTextFile(ozone_data, ozone_text)
    createTextFile(ozone_data_2, ozone_text)

def createTextFile(input_file, output_file):
    input_file = input_file[1:]
    output_file_opened = open(output_file, 'a+')

    for ndx, row in input_file.iterrows():
        s = ''
        s = 'INSERT INTO OBSERVATION VALUES ('
        for key, val in enumerate(row):
            if key == 8:
                s = s + "'" + str(val) + "',"
            else:
                s = s + str(val) + ','
        
        s = s[:-1] + ');'
        output_file_opened.write(s + '\n')

main()