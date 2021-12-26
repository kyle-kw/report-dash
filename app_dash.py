from datetime import date, datetime

import dash
import dash_html_components as html
import dash_bootstrap_components as dbc
import dash_core_components as dcc
import dash_uploader as du
from dash.dependencies import Input, Output, State
from flask import send_from_directory

# import app_spider_sum as ass  
# 爬虫代码，具有公司的私密数据，不能放出来

app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

server = app.server

du.configure_upload(app, folder='temp')

navbar = dbc.NavbarSimple(
    children=[
        dbc.NavItem(
            dbc.NavLink(
                '',
                href='#'
            )
        ),
    ],
    brand='报表生成工具',
    brand_href='#',
    color='dark',
    dark=True
)

body_layout = dbc.Container(
    [
        dbc.Row([
            dbc.Col(
                [
                    dcc.Markdown(
                        f'''
                        ----
                        ### 介绍：
                        ----
                        工具介绍：此工具可用于**爬取系统数据**和**生成报表**。
                        
                        数据源：[全国系统](/)、\
                        [河南系统](/)、\
                        [发票系统](/)
                        
                        使用提示：
                        '''
                    )
                ],
                sm=12,
                md=6
            ),
        ]),
        dbc.Row([
            dbc.Col([
                dcc.Markdown(
                    '''
                    ----
                    ### 报表生成：
                    ----
                    
                    '''
                )
            ],
                sm=12,
                md=6
            )
        ]),
        dbc.Row([
            dbc.Col(
                [
                    dcc.Markdown(
                        '''
                        ##### 选择日期:
                        '''
                    )
                ],
                sm=12,
                md=2
            ),
            dbc.Col(
                [
                    dcc.DatePickerSingle(
                        id='date-picker',
                        min_date_allowed=date(2021, 1, 1),
                        max_date_allowed=datetime.now(),
                        initial_visible_month=datetime.now(),
                        date=datetime.now(),
                        display_format='YYYY-MM-DD'
                    ),
                ],
                sm=12,
                md=2
            ),
            dbc.Col(
                [
                    dbc.Button('生成',
                               id='state-button',
                               n_clicks=0),
                ],
                sm=12,
                md=1
            ),
        ]),
        html.Br(),
        dbc.Row([
            dbc.Col(
                [
                    dcc.Markdown(
                        '''
                        ##### 选择报表:
                        '''
                    )
                ],
                sm=12,
                md=2
            ),
            dbc.Col([
                dcc.Dropdown(
                    options=[
                        {'label': '报表一', 'value': 'bo'},
                        {'label': '报表二', 'value': 'be'},
                        {'label': '报表三', 'value': 'bs'},
                        {'label': '报表四', 'value': 'bf'},
                        {'label': '报表五', 'value': 'bfi'},
                    ],
                    value="sd",
                    id='report-c'
                ),
            ],
                sm=12,
                md=2
            ),

        ]),
        html.Br(),
        dbc.Row([
            dbc.Col([
            ],
                id='uploader',
                sm=12,
                md=6
            )
        ]),
        dbc.Row([
            dbc.Col([],id = 'test',)
        ]),
        html.Hr(),
    ],
    style={'marginTop': 20}
)


@app.callback(Output('test', 'children'),
              State('report-c','value'),
              State('date-picker','date'),
              Input('state-button', 'n_clicks'),
              prevent_initial_call=True)
def test_data(report, date_picker, n_clicks):
    report_list = copy_to_temp(report, date_picker[:10])
    s = f'''
    {date_picker[:10]}  **{"    ".join(report_list)}**  已发送邮箱。
    '''
    return [
        dcc.Markdown(s),
        html.Ul(
            [
                html.Li(html.A(f'/{file}', href=f'/download/{file}', target='_blank'))
                for file in report_list
            ])
    ]

def copy_to_temp(report,date_picker):
    (y, m, d) = date_picker.split('-')
    date0 = date(int(y), int(m), int(d))
    if report=='bo':
        ass.fstj(date0)
        return [f'报表一{m}{d}.xlsx']
    elif report=='be':
        ass.fb_one(date0)
        return [f'报表二{m}{d}.xlsx']
    elif report=='bs':
        ass.hn_rb(date0)
        return [f'报表三{m}{d}.docx']
    elif report=='bf':
        ass.gsht(date0)
        return [f'报表四{m}{d}.xlsx']
    elif report == 'bfi':
        ass.hn_jx(date0)
        return [f'报表五-1{m}{d}.xlsx',f'报表五-2{m}{d}.xlsx',f'报表五-3{m}{d}.xlsx']


@app.callback(Output('uploader', 'children'),
              Input('report-c', 'value'))
def test_data(report):
    if report=='bs':
        return du.Upload(
                    id='uploaders',
                    text='报表三需要上传日报1！',
                    text_completed='已完成上传文件：',
                    cancel_button=True,
                    pause_button=True,
                    filetypes=['xls', 'xlsx', 'doc', 'docx'],
                    default_style={
                        'background-color': '#fafafa',
                        'font-weight': 'bold'
                    },
                    upload_id='my_upload'
                )

@app.server.route('/download/<file>')
def download(file):
    return send_from_directory('temp', file)


app.layout = html.Div([navbar, body_layout])

if __name__ == '__main__':
    app.run_server(debug=True)
