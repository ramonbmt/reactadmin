/* eslint-disable */

const tableColumns = [
	{
		name			: '',
		displayName		: '',
		search			: true,
		order			: false
	}
]
const clientes = (
    <BMTModule>
        <BMTPath title="Clientes" path="list" exact>
            <BMTControls>
                <BMTControls.Right>
                    <BMTButton route="add" />
                </BMTControls.Right>
            </BMTControls>
			<BMTTabs title="Clientes Activos">
				<BMTTable queryConnection={ clientConnection } columns={ tableColumns } >
					<BMTTable.Excel />
					<BMTTable.Search />
				</BMTTable>
			</BMTTabs>
			<BMTTabs title="Clientes Bloqueados">
				<BMTTable queryConnection={ clientConnection } columns={ tableColumns } filter={ filter } >
					<BMTTable.Excel />
				</BMTTable>
			</BMTTabs>
        </BMTPath>

		<BMTPath id="add" path="add" exact>
            <BMTForm schema={ yupSchema } mutation={ clientMutation } />
        </BMTPath>

		<BMTPath path="details/:id" exact hidden>
            <BMTEdit schema={ yupSchema } query={ clientQuery } mutation={ clientMutation } />
        </BMTPath>

        <BMTPath path="custom" component={ CustomComponent } exact />
    </BMTModule>
)

/* eslint-enable */
