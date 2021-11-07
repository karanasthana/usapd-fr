import pandas as pd

def main():
    date_data = pd.read_csv("/Users/karanasthana/Personal/usapd-fr/date-table-final.csv")
    
    date_text = '/Users/karanasthana/Personal/usapd-fr/Scripts/date_sql.txt'
    
    createTextFile(date_data, date_text)

def createTextFile(input_file, output_file):
    # input_file = input_file[1:]
    output_file_opened = open(output_file, 'a+')

    for ndx, row in input_file.iterrows():
        s = ''
        s = 'INSERT INTO DATE VALUES ('
        for key, val in enumerate(row):
            if key in [0]:
                s = s + "'" + str(val) + "',"
            else:
                s = s + str(val) + ','
        
        s = s[:-1] + ');'
        output_file_opened.write(s + '\n')

main()