﻿CREATE TABLE [dbo].[test] (
    [id]    INT      IDENTITY (1, 1) NOT NULL,
    [date]  DATETIME CONSTRAINT [DF_test_date] DEFAULT (getdate()) NULL,
    [C01]   INT      NULL,
    [C02]   INT      NULL,
    [C03]   INT      NULL,
    [C04]   INT      NULL,
    [C05]   INT      NULL,
    [C06]   INT      NULL,
    [C07]   INT      NULL,
    [C08]   INT      NULL,
    [C09]   INT      NULL,
    [C10]   INT      NULL,
    [C11]   INT      NULL,
    [C12]   INT      NULL,
    [C13]   INT      NULL,
    [C14]   INT      NULL,
    [C15]   INT      NULL,
    [C16]   INT      NULL,
    [C17]   INT      NULL,
    [C18]   INT      NULL,
    [C19]   INT      NULL,
    [C20]   INT      NULL,
    [C21]   INT      NULL,
    [C22]   INT      NULL,
    [C23]   INT      NULL,
    [C24]   INT      NULL,
    [C25]   INT      NULL,
    [C26]   INT      NULL,
    [C27]   INT      NULL,
    [C28]   INT      NULL,
    [C29]   INT      NULL,
    [C30]   INT      NULL,
    [C31]   INT      NULL,
    [C32]   INT      NULL,
    [C33]   INT      NULL,
    [C34]   INT      NULL,
    [C35]   INT      NULL,
    [C36]   INT      NULL,
    [C37]   INT      NULL,
    [C38]   INT      NULL,
    [C39]   INT      NULL,
    [C40]   INT      NULL,
    [C41]   INT      NULL,
    [C42]   INT      NULL,
    [C43]   INT      NULL,
    [C44]   INT      NULL,
    [C45]   INT      NULL,
    [C46]   INT      NULL,
    [C47]   INT      NULL,
    [C48]   INT      NULL,
    [C49]   INT      NULL,
    [C50]   INT      NULL,
    [C51]   INT      NULL,
    [C52]   INT      NULL,
    [C53]   INT      NULL,
    [C54]   INT      NULL,
    [C55]   INT      NULL,
    [C56]   INT      NULL,
    [C57]   INT      NULL,
    [C58]   INT      NULL,
    [C59]   INT      NULL,
    [C60]   INT      NULL,
    [C61]   INT      NULL,
    [C62]   INT      NULL,
    [C63]   INT      NULL,
    [C64]   INT      NULL,
    [Label] CHAR (1) NULL,
    CONSTRAINT [PK_test_id] PRIMARY KEY CLUSTERED ([id] ASC)
);

